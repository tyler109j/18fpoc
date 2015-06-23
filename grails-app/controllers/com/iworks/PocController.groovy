package com.iworks

class PocController {


    def pocService

    def index() {}

    def ajaxGetData() {


        def parameterMap = params

        parameterMap.remove('action')
        parameterMap.remove('controller')

        println parameterMap.collect {it->}.join('+')

         //def returnData = pocService.queryFDA(parameterMap)

        //println returnData

    }
}
