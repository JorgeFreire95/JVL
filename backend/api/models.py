from django.db import models
from django.contrib.auth.models import User
import uuid

class Announcement(models.Model):
    CATEGORY_CHOICES = [
        ('Jóvenes', 'Jóvenes'),
        ('Adolescentes', 'Adolescentes'),
        ('Iglesia General', 'Iglesia General'),
        ('Niños', 'Niños'),
        ('Mujeres', 'Mujeres'),
        ('Hombres', 'Hombres'),
    ]

    title = models.CharField(max_length=200, verbose_name="Título")
    date = models.DateField(verbose_name="Fecha de Inicio")
    end_date = models.DateField(verbose_name="Fecha de Finalización", blank=True, null=True)
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
    photo_data = models.BinaryField(verbose_name="Datos de la foto", blank=True, null=True)
    content_type = models.CharField(max_length=50, verbose_name="Tipo de archivo", blank=True, null=True)
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

class Event(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título del Evento")
    date = models.DateField(verbose_name="Fecha")
    image_data = models.BinaryField(verbose_name="Datos de la imagen", blank=True, null=True)
    content_type = models.CharField(max_length=50, verbose_name="Tipo de archivo", blank=True, null=True)
    sermon = models.TextField(verbose_name="Sermón Expuesto")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Evento Realizado"
        verbose_name_plural = "Eventos Realizados"
        ordering = ['-date']

class GalleryImage(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título", blank=True)
    image_data = models.BinaryField(verbose_name="Datos de la imagen", blank=True, null=True) 
    content_type = models.CharField(max_length=50, verbose_name="Tipo de archivo", help_text="Ej: image/jpeg", default='image/jpeg')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de subida")

    def __str__(self):
        return self.title if self.title else f"Imagen {self.id}"

    @property
    def image_preview(self):
        if self.image_data:
            import base64
            from django.utils.html import format_html
            encoded = base64.b64encode(self.image_data).decode('utf-8')
            return format_html('<img src="data:{};base64,{}" style="max-height: 100px; max-width: 100px;" />', self.content_type, encoded)
        return "Sin imagen"

    class Meta:
        verbose_name = "Imagen de Galería"
        verbose_name_plural = "Imágenes de Galería"
        ordering = ['-created_at']
