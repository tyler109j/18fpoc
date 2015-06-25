package com.iworks

import grails.transaction.Transactional

@Transactional(readOnly = true)
class PocService {


    def grailsApplication

    def queryFDA(String parameters) {

        StringBuffer strBuffer = new StringBuffer()

        if (!parameters.contains("search")) {

            parameters = "search=" + parameters
        } else {


            parameters = parameters.replace("search:", "search=")
        }

        strBuffer << grailsApplication.config.grails.fda.apiURL << "/enforcement.json" << "?api_key=" << grailsApplication.config.grails.fda.apiKey << "&" << parameters << "&limit=" << 100

        println strBuffer
        def returnString
        try {
            returnString = strBuffer.toURL()?.text
        }catch(FileNotFoundException e){

            returnString = '{}'
        } finally {

            returnString
        }


    }


}
