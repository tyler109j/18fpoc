package com.iworks

import grails.transaction.Transactional

@Transactional(readOnly = true)
class PocService {


    def grailsApplication

    def queryFDA(String parameters) {

        StringBuffer strBuffer = new StringBuffer()


        strBuffer << grailsApplication.config.grails.fda.apiURL << "/enforcement.json" << "?api_key=" << grailsApplication.config.grails.fda.apiKey << "&" << parameters << "&limit=" <<100

        println strBuffer
        strBuffer.toURL().text


    }


}
