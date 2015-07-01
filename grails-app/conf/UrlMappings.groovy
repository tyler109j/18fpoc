class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        "/ajaxGetFDAData"(controller: 'poc',action:'ajaxGetData')
        "/"(view:"/index")
        "500"(view:'/error')
	}
}
