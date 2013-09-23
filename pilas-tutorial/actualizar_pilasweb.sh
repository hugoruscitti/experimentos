cd ../../pilasweb;

echo ""
echo "Iniciando compilacion ..."
grunt
echo "-- fin compilacion"
echo ""

cd -

echo "Copiando pilasweb.js"
cp ../../pilasweb/public/pilasweb.js app/

echo "Copiando directorio DATA"
cp -R -f ../../pilasweb/public/data app/
