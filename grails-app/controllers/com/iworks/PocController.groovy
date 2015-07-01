package com.iworks

class PocController {


    def pocService

    def index() {}

    def ajaxGetData() {


        def parameterMap = params

        String searchString = Utils.createQueryString(parameterMap)

        log.debug "searchString |" + searchString

        def returnData = pocService.queryFDA(searchString)

        render contentType: 'application/json', text: returnData

    }
}
