from django.shortcuts import render, redirect

def handler404(request, exception):
    """Return a custom 400 error HTML page."""
    context = {"error_code": 400, "request": request}
    return render(request, "error.html", context=context)


def handler500(request):
    """Return a custom 500 error HTML page."""
    context = {"error_code": 500, "request": request}
    return render(request, "error.html", context=context)
