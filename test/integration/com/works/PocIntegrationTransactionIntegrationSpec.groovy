package com.works

import com.iworks.PocController;

import grails.test.spock.IntegrationSpec
import groovy.json.JsonSlurper

class PocIntegrationTransactionIntegrationSpec extends IntegrationSpec {

    def setup() {
    }

    def cleanup() {
    }

    void "testIntegrationOfControlAndServiceForOneRecordResult"() {
		//Set the params in Poc Controler
		when:
		def pocService
		def pocContrl = new PocController()
		pocContrl.params.search="cranberry"
		pocContrl.params.state="TN"
		pocContrl.params.status="ongoing"
		pocContrl.ajaxGetData()
		String strResult = pocContrl.response.text
		then:
		def slurper = new JsonSlurper()
		def result = slurper.parseText(strResult)
		assert result.meta.results.total == 1
		
    }
}
