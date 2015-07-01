# 18fpoc
The approach taken for the Agile BPA prototype was iWorks' patented iAIM approach.

To start, Scott Kerr was identified as the leader, and created the schedule for the project as the first step.  He set daily stand-up meetings for the team to review progress and raise issues or questions.  Next, a team of four resources was assembled, combining expertise in six categories: product manager, agile coach, business analyst, visual designer, technical architect, frontend web developer, backend web developer, and usability tester. These four resources scheduled a kick-off meeting in which the design of the prototype was created.

Additional resources were included in the kickoff meeting, including those who served as the voice of a "typical user."  They provided "personas" which helped the team brainstorm a design to meet their needs.  High-level use cases were written to document the design.

Development
- design style guide/ pattern library
- set up continuous integration
- create a prototype that works on multiple devices
- use at least five open source technologies
- deployed on a Platform as a Service - OpenShift
- write unit tests
- set up/ used configuration management
- set up/ used continous monitoring
- deploy software in a container
- make use of an API (either consuming or providing one)

Testing
- usability tests
- iterative approach; feedback informed subsequent work or versions of the prototype
- Provided sufficient documentation to install and run on another machine
- Prototype and underlying platforms used are openly licensed and free of charge


# Build
 To build this app, clone the project and after you clone, please run the command ./grailsw war. This will create a war file in the target folder which you can deploy to a any servelet container like tomcat, jetty or netty.

To use the virtualized container run the command in the project directory
 docker build -t "18fpocdev" .
after the image is built, run the following command
docker run -i -t -p 8080:8080 18fpocdev
your app should be available at the following url http://{yourdockervmipaddress}:8080/18fpoc
