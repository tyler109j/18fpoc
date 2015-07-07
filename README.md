# 18f Prototype
The iWorks team used our trademark pending Agile Implementation Methodology (iAIM™) to design, develop, and build the prototype (for more information, please refer to the iAIM Whitepaper.md in GitHub.)  The following summarizes the approach we applied to create the prototype.

### Project Identification:
Upon reviewing the RFP requirements, iWorks' management team identified Scott Kerr as the lead for this effort. Scott conducted a detailed review of the requirements by analyzing the FDA dataset and defining the project’s stakeholders in order to generate a system request to gain approval from management.

### Planning: 
With approval from management, and leadership from Scott, a core team was created, combining expertise in four labor categories: Technical Architect, Frontend Web Developer, Backend Developer, and DevOps Engineer (*refer to Attachment E, Criteria B*.) The team established the project plan and scope. Scott finalized the project schedule and uploaded it on GitHub to ensure that all team members were aware of their responsibilities (*refer to Attachment E, Criteria A*.) Additionally, the team scheduled daily standup meetings for the duration of the project to focus on continuous iterations of the prototype and project status; as well as the development and testing in order to resolve any occurring issues (*refer to Attachment E, Criteria J*.)

Taking a multidisciplinary and collaborative approach, the core team analyzed RFQ requirements and FDA open dataset/API to explore the various prototype options to develop, including technology architectures and toolsets.

To meet guideline recommendations from the U.S. Digital Services Playbook, the team organized multiple JAD sessions with relevant stakeholders to begin the development process. Applying a user-centric approach during these JAD sessions, the team created different personas to represent users that may access the web application. These sessions would prove to be essential to the team in creating high-level use cases, identifying human-centered elements, and creating a working prototype.

Due to the iterative characteristics of this project, the team selected an agile methodology based on rapid prototyping to deliver the project on time.

### Execution and Monitoring: 
Monitoring of the project started by deploying a configuration management system that matched the agile nature of the project. The team selected GitHub as the configuration management system to track the requirements, documentation, and development progress of the web application throughout the sprint (*refer to Attachment E, Criteria G*.) Development started by selecting programming languages, the API, a test/deployment platform, and an infrastructure to build and host the application.

Groovy was chosen for the programming language due to its seamless integration with Grails, our web application framework.  In addition, Grails was used to generate integration and functional test stubs for Grails components.  This was done to test end-to-end user scenarios for providing search query parameters and generating API query statements (*Refer to Attachment E, Criteria E*.) Bootstrap, an open-source frontend, was selected to serve as the pattern library; and provide a frontend framework to allow the prototype to scale and be responsive to various browser and mobile applications. D3.Js performed as our JavaScript library while JQuery allowed us to have client side scripting on the browser.  (*Refer to Attachment E, Criteria C & L*.)

In order to bring our application to life, we used the Open.FDA REST API and created attributes to receive responses within the web application. Travis CI was used for testing the system and deploying the code due to the seamless integration it has with GitHub (*refer to Attachment E, Criteria F*.)  

OpenShift, a platform powered by Red Hat and FedRAMP Certified on ARC-P, was used to host our Platform-as-a-Service (PaaS) deployment (Refer to Attachment E, Criteria D.) OpenShift provided our application with continuous monitoring services, ensuring proper connectivity, and maintenance of any security gaps (*refer to Attachment E, Criteria H*.)  To deploy our application, we used Docker, a virtualized operation system, inside of an Apache Tomcat servlet container (*refer to Attachment E, Criteria I & K*.)  

### Closing:
After establishing the infrastructure of our system, a second sprint was initiated to conduct usability tests. During these tests our DevOps Engineers and our frontend/backend web developer met on a frequent basis to test the system, provide feedback, and resolve any last minute defects.

It was iWorks’ goal to create a web application that would help connect the general public with food recall information from the FDA. Our goal was accomplished by developing a more human-centered prototype to display these recalls. We hope that the government can use this application to spread awareness among the general public. 
