# Build Instructions
 To build this app, clone the project and after you clone, please run the command ./grailsw war. This will create a war file in the target folder which you can deploy to a any servelet container like tomcat, jetty or netty.

To use the virtualized container run the command in the project directory
 docker build -t "18fpocdev" .
 
after the image is built, run the following command
docker run -i -t -p 8080:8080 18fpocdev
your app should be available at the following url http://{yourdockervmipaddress}:8080/18fpoc
