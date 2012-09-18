Est ejemplo muestra un circulo rojo en el navegador. Ese circulo
escucha las órdenes de movimiento desde un servidor juggernaut, que
a su vez, recibe ordenes desde un script de python.

La forma de probar este ejemplo es abrir los siguientes
procesos en este orden (en diferentes consolas):

    redis-server
    juggernaut
    firefox ejemplo_coordenadas.html
    python emitir_coordenadas.py


## Instalación

    sudo apt-get install redis-server
    (o descargar redis desde su sitio http://redis.io)

    sudo apt-get install npm
    npm install -g juggernaut

    mkvirtualenv juggernaut
    pip install -r requierements.txt
