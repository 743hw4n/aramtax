import os

env = os.getenv('DJANGO_ENV', 'local')

if env not in ['production', 'local']:
    raise RuntimeError(f'Invalid DJANGO_ENV: {env}')

if env == 'production':
    from .production import *
else:
    from .local import *