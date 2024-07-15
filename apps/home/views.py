from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render


@login_required(login_url="/login/")
def pages(request):
    context = {}
    load_template = request.path.split('/')[-1]

    # Redirigir a la página de administración si la URL es 'admin'
    if load_template == 'admin':
        return HttpResponseRedirect(reverse('admin:index'))

    # Si la URL corresponde a una vista específica, renderizar esa vista
    if load_template in ['seccion', 'notasal', 'testvocacional', 'cuestionario']:
        return globals()[load_template](request)

    # Si la URL no coincide con ninguna vista específica, cargar la plantilla HTML correspondiente
    try:
        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    # Manejar el caso en que no se encuentre la plantilla
    except template.TemplateDoesNotExist:
        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    # Manejar otros errores
    except Exception as e:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))

# paginas

@login_required(login_url="/login/")
def perfil(request):
    context = {
        'segment': 'perfil' 
    }
    return render(request, 'home/perfil.html', context)

@login_required(login_url="/login/")
def alumnos(request):
    
    seccion = request.GET.get('seccion')

    alumnos = Alumno.objects.filter(año_cursado__nombre=seccion)

    
    añocursos = AñoCurso.objects.all()

    context = {'segment': 'alumnos', 'alumnos': alumnos,'seccion': seccion, 'añocursos': añocursos}
    return render(request, 'home/alumnos.html', context)

@login_required(login_url="/login/")
def notas(request):
    segment = 'notas.html'
    context = {'segment': segment}

    html_template = loader.get_template('home/notas.html')
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def testvocacional(request):
    segment = 'testvocacional.html'
    context = {'segment': segment}

    html_template = loader.get_template('home/testvocacional.html')
    return HttpResponse(html_template.render(context, request))

    # Si es una solicitud GET inicial, renderizar la página con el formulario
    return render(request, 'home/testvocacional.html', context)

@login_required(login_url="/login/")
def cuestionario(request):
    segment = 'cuestionario.html'
    context = {'segment': segment}

    html_template = loader.get_template('home/cuestionario.html')
    return HttpResponse(html_template.render(context, request))