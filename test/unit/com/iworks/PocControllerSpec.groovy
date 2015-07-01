

package com.iworks
import org.spockframework.mock.runtime.MockController;
import org.springframework.stereotype.Controller;

import com.sun.media.sound.RealTimeSequencer.ControllerListElement;

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(PocController)
class PocControllerSpec extends Specification {

    def setup() {	
    }

    def cleanup() {
    }
	
    void "testSearchStringWithStatusSearchStateParameters"() {
		given:
		params.status = 'OnGoing'
		params.search = 'milk'
		params.state = 'NY'
		
		when:	
		String searchString = Utils.createQueryString(params)
		println "searchString |" + searchString
		
		then:
		searchString.equals("status:ongoing+AND+search:milk+AND+state:ny")
    }
	
	void "testSearchStringWithStatusSearchNullStateParameters"() {
		given:
		params.putAt("status", 'OnGoing')
		params.putAt("state", 'NY')
	
		when:
		String searchString = Utils.createQueryString(params)
		println "searchString |" + searchString
		
		then:
		searchString.equals("status:ongoing+AND+state:ny")
	}
	
	void "testSearchStringWithStatusSearchBlankStateParameters"() {
		given:
		params.status = 'OnGoing'
		params.state = 'NY'
		params.search = ''
		
		when:
		String searchString = Utils.createQueryString(params)
		println "searchString |" + searchString
		
		then:
		searchString.equals("status:ongoing+AND+state:ny")
	}
	
	void "testSearchStringWithStatusNoSearchStateParameters"() {
		given:
		params.status = 'OnGoing'
		params.state = 'NY'
		
		when:
		String searchString = Utils.createQueryString(params)
		println "searchString |" + searchString
		
		then:
		searchString.equals("status:ongoing+AND+state:ny")
	}
	
	void "testSearchStringWithBlankStatusNoSearchStateParameters"() {
		given:
		params.status = ''
		params.state = 'NY'
		
		when:
		String searchString = Utils.createQueryString(params)
		println "searchString |" + searchString
		
		then:
		searchString.equals("status:+AND+state:ny")
	}
	
	void "testSearchStringWithNoStatusNoSearchStateParameters"() {
		given:
		params.state = 'NY'
		
		when:
		String searchString = Utils.createQueryString(params)
		println "searchString |" + searchString
		
		then:
		searchString.equals("state:ny")
	}
	
	
}
