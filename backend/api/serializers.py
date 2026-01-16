from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Announcement, ContactCard
import hashlib

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    password_md5 = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password_md5', 'is_staff']

    def get_password_md5(self, obj):
        """Devuelve el hash MD5 de la contraseña (solo para visualización)"""
        return None  # No devolvemos contraseñas por seguridad

    def validate_username(self, value):
        """Validar que el nombre de usuario sea único"""
        if self.instance is None:  # Solo validar en creación
            if value and User.objects.filter(username=value).exists():
                raise serializers.ValidationError("El nombre ya existe.")
        else:  # En actualización, permitir el mismo username
            if value and User.objects.filter(username=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("El nombre ya existe.")
        return value

    def validate_email(self, value):
        """Validar que el email sea único"""
        if self.instance is None:  # Solo validar en creación
            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("El correo electrónico ya está registrado.")
        else:  # En actualización, permitir el mismo email
            if User.objects.filter(email=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("El correo electrónico ya está registrado.")
        return value

    def validate_password(self, value):
        """Validar que la contraseña tenga una longitud mínima"""
        if self.instance is None and not value:  # Password requerido en creación
            raise serializers.ValidationError("La contraseña es requerida al crear un usuario.")
        if value and len(value) < 6:
            raise serializers.ValidationError("La contraseña debe tener al menos 6 caracteres.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        email = validated_data.get('email', '')
        username = validated_data.get('username', '')
        
        # Si no hay username, generar uno basado en el email
        if not username:
            username = email.split('@')[0]
            # Asegurar que sea único
            base_username = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
        
        validated_data['username'] = username
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=email,
            **{k: v for k, v in validated_data.items() if k not in ['username', 'email']}
        )
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class ContactCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactCard
        fields = '__all__'
