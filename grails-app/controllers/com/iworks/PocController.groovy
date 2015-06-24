package com.iworks

class PocController {


    def pocService

    def index() {}

    def ajaxGetData() {


        def parameterMap = params

        parameterMap.remove('action')
        parameterMap.remove('controller')
        parameterMap.remove('format')

        String searchString =parameterMap.collect{it}.join('+AND+')

        println "searchString |" + searchString

         def returnData = pocService.queryFDA(searchString)

        render contentType:'application/json',text:returnData

    }
}
