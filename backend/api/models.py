from django.db import models
from django.contrib.auth.models import User
import uuid

class Announcement(models.Model):
    CATEGORY_CHOICES = [
        ('Jóvenes', 'Jóvenes'),
        ('Iglesia General', 'Iglesia General'),
        ('Niños', 'Niños'),
        ('Mujeres', 'Mujeres'),
        ('Hombres', 'Hombres'),
    ]

    title = models.CharField(max_length=200, verbose_name="Título")
    date = models.DateField(verbose_name="Fecha")
    time = models.CharField(max_length=100, verbose_name="Hora")
    location = models.CharField(max_length=200, verbose_name="Ubicación")
    description = models.TextField(verbose_name="Descripción")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name="Categoría")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Anuncio"
        verbose_name_plural = "Anuncios"
        ordering = ['date']

class ContactCard(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    role = models.CharField(max_length=100, verbose_name="Cargo/Rol")
    photo = models.ImageField(upload_to='team_photos/', verbose_name="Foto", blank=True, null=True)
    whatsapp_link = models.URLField(verbose_name="Enlace de WhatsApp", help_text="Ej: https://wa.me/1234567890")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden de aparición")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Tarjeta de Contacto"
        verbose_name_plural = "Tarjetas de Contacto"
        ordering = ['order']

class ActiveSession(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='active_session', verbose_name="Usuario")
    session_token = models.CharField(max_length=255, unique=True, verbose_name="Token de Sesión")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    last_activity = models.DateTimeField(auto_now=True, verbose_name="Última Actividad")

    def __str__(self):
        return f"Sesión de {self.user.email}"

    class Meta:
        verbose_name = "Sesión Activa"
        verbose_name_plural = "Sesiones Activas"
