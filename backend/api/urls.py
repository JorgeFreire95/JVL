from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnnouncementViewSet, ContactCardViewSet, UserViewSet, login_view, logout_view, EventViewSet

router = DefaultRouter()
router.register(r'announcements', AnnouncementViewSet)
router.register(r'contacts', ContactCardViewSet)
router.register(r'users', UserViewSet)
router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
]
