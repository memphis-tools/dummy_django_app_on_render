from django.shortcuts import render, redirect
import traceback
import sys

def handler404(request, exception):
    """Return a custom 404 error HTML page with detailed traceback."""
    # Capture the traceback
    exc_type, exc_value, exc_traceback = sys.exc_info()
    trace = ''.join(traceback.format_exception(exc_type, exc_value, exc_traceback))

    # Create context with error details
    context = {
        "error_code": 404,
        "request": request,
        "traceback": trace  # Add traceback to context
    }

    # Render the custom error page with traceback
    return render(request, "error.html", context=context)


def handler500(request):
    """Return a custom 500 error HTML page."""
    context = {"error_code": 500, "request": request}
    return render(request, "error.html", context=context)
