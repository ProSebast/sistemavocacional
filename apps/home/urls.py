from django.urls import path, re_path
from apps.home import views
from .admin import admin_site

urlpatterns = [
    path('admin/', admin_site.urls),
    # The home page
    path('', views.pages, name='home'),
    path('perfil/', views.perfil, name='perfil'),
    path('seccion/', views.seccion, name='seccion'),
    path('alumnos/<int:asignatura_id>/', views.alumnos, name='alumnos'),
    path('notasal/', views.notasal, name='notasal'),
    path('analisisnota/', views.analisisnota, name='analisisnota'),
    path('testvocacional/', views.testvocacional, name='testvocacional'),
    path('cuestionario/', views.cuestionario, name='cuestionario'),
    path('asignaturas/<int:id_añocurso>/', views.asignaturas, name='asignaturas'),
    path('guardar_calificaciones/', views.guardar_calificaciones, name='guardar_calificaciones'),

    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

]
