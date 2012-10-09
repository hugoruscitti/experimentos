# Realtime ABM

Este directorio tiene una pequeña prueba de concepto sobre EventSource
y 

    mkvirtualenv realtime_abm
    pip install -r requirements.txt
    python app
    redis-server


Para emitir mensajes entre distintos usuarios, podrías abrir
varias ventanas del navegador y escribir en el area de texto.

Otra opción es abrir el cliente de redis y escribir directamente
ahí:

    redis-cli 

    redis 127.0.0.1:6379> publish chat "[hora] persona: Hola mundo !!!"
    redis 127.0.0.1:6379> publish chat "[hora] persona: chau !"
