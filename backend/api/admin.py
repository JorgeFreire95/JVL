from django.contrib import admin
from django import forms
from .models import Announcement, ContactCard, Event, GalleryImage

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'category')
    list_filter = ('category', 'date')
    search_fields = ('title', 'description')

class ContactCardForm(forms.ModelForm):
    photo_file = forms.ImageField(label="Foto", required=False)

    class Meta:
        model = ContactCard
        fields = ['name', 'role', 'photo_file', 'whatsapp_link', 'order']

    def save(self, commit=True):
        instance = super().save(commit=False)
        photo = self.cleaned_data.get('photo_file')
        if photo:
            instance.photo_data = photo.read()
            instance.content_type = photo.content_type
        if commit:
            instance.save()
        return instance

@admin.register(ContactCard)
class ContactCardAdmin(admin.ModelAdmin):
    form = ContactCardForm
    list_display = ('name', 'role', 'order', 'photo_preview')
    list_editable = ('order',)
    search_fields = ('name', 'role')
    readonly_fields = ('photo_preview',)

    def photo_preview(self, obj):
        return obj.image_preview
    photo_preview.short_description = "Vista previa"

class EventForm(forms.ModelForm):
    image_file = forms.ImageField(label="Foto del Evento", required=False)

    class Meta:
        model = Event
        fields = ['title', 'date', 'image_file', 'sermon']

    def save(self, commit=True):
        instance = super().save(commit=False)
        image = self.cleaned_data.get('image_file')
        if image:
            instance.image_data = image.read()
            instance.content_type = image.content_type
        if commit:
            instance.save()
        return instance

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventForm
    list_display = ('title', 'date', 'image_preview')
    search_fields = ('title', 'sermon')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        return obj.image_preview
    image_preview.short_description = "Vista previa"

class GalleryImageForm(forms.ModelForm):
    image_file = forms.ImageField(label="Seleccionar Imagen", required=False)

    class Meta:
        model = GalleryImage
        fields = ['title', 'image_file']

    def clean(self):
        cleaned_data = super().clean()
        image_file = cleaned_data.get("image_file")
        if not self.instance.pk and not image_file:
            self.add_error('image_file', 'La imagen es obligatoria.')
        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        image = self.cleaned_data.get('image_file')
        if image:
            instance.image_data = image.read()
            instance.content_type = image.content_type
        if commit:
            instance.save()
        return instance

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    form = GalleryImageForm
    list_display = ('id', 'title', 'image_preview', 'created_at')
    search_fields = ('title',)
    list_filter = ('created_at',)
    readonly_fields = ('image_preview',)
