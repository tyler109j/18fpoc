package com.iworks

import grails.transaction.Transactional
import groovyx.net.http.ContentType

@Transactional(readOnly =true)
class PocService {


    def grailsApplication

    def queryFDA(def parameters) {

        def returnData
        withHttp(uri: grailsApplication.config.grails.fda.apiURL, contentType: ContentType.JSON) {


            returnData = get(query: parameters.collect { it }.join('+'))
        }

    }

}
