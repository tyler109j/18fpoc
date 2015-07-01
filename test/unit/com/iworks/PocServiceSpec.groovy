package com.iworks

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import groovy.json.JsonSlurper
import org.codehaus.groovy.grails.web.json.JSONObject
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(PocService)
class PocServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

	void "testOneResult"(){
		when:
		String searchInput = "cranberry+AND+state:tn+AND+status:ongoing"
		String returnStr = service.queryFDA(searchInput)
		
		then:
		def slurper = new JsonSlurper()
		def result = slurper.parseText(returnStr)
		assert result.meta.results.total == 1
	}
	
	void "testResultsAreNotEmpty"(){
		when:
		String searchInput = "cranberry+AND+state:tn+AND+status:ongoing"
		String returnStr = service.queryFDA(searchInput)
		
		then:
		def slurper = new JsonSlurper()
		def result = slurper.parseText(returnStr)
		assert  !result.isEmpty()
	}
	
	
	
	void "testZeroResults"(){
		when:
		String searchInput = "tires+AND+state:tn+AND+status:ongoing"
		String returnStr = service.queryFDA(searchInput)
		
		then:
		JSONObject newOb = new JSONObject(returnStr)
		assert newOb.isEmpty()
	}
	
	
}
