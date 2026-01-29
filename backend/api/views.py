from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Announcement, ContactCard, ActiveSession, Event
from .serializers import AnnouncementSerializer, ContactCardSerializer, UserSerializer, EventSerializer
import uuid
import hashlib

def get_md5_hash(text):
    """Genera el hash MD5 de un texto"""
    return hashlib.md5(text.encode()).hexdigest()

@csrf_exempt
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print(f"Intento de login - Email: {email}")
    
    # Buscar el usuario por email
    try:
        user = User.objects.get(email=email)
        # Verificar la contraseña
        if user.check_password(password):
            # Verificar si el usuario ya tiene una sesión activa
            existing_session = ActiveSession.objects.filter(user=user).first()
            
            if existing_session:
                print(f"Sesión anterior detectada para {email}. Cerrándola automáticamente.")
                existing_session.delete()
            
            # Crear un nuevo token de sesión
            session_token = str(uuid.uuid4())
            active_session = ActiveSession.objects.create(
                user=user,
                session_token=session_token
            )
            
            print(f"Sesión creada para {email}")
            return Response({
                'message': 'Login exitoso',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_staff': user.is_staff
                },
                'session_token': session_token,
                'password_md5': get_md5_hash(password)
            })
        else:
            print(f"Contraseña incorrecta para {email}")
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        print(f"Usuario con email {email} no encontrado")
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    session_token = request.data.get('session_token')
    
    if not session_token:
        return Response({'error': 'Token de sesión requerido'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        session = ActiveSession.objects.get(session_token=session_token)
        user_email = session.user.email
        session.delete()
        print(f"Sesión cerrada para {user_email}")
        return Response({
            'message': 'Sesión cerrada exitosamente'
        })
    except ActiveSession.DoesNotExist:
        print(f"Sesión con token {session_token} no encontrada")
        return Response({'error': 'Sesión no válida'}, status=status.HTTP_401_UNAUTHORIZED)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

class ContactCardViewSet(viewsets.ModelViewSet):
    queryset = ContactCard.objects.all()
    serializer_class = ContactCardSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
