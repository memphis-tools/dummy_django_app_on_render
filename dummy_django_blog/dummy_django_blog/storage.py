from whitenoise.storage import CompressedManifestStaticFilesStorage

class CustomStaticFilesStorage(CompressedManifestStaticFilesStorage):
    def _open(self, name, mode='rb'):
        try:
            return super()._open(name, mode)
        except FileNotFoundError:
            # Handle missing file gracefully, for example by returning None
            return None
