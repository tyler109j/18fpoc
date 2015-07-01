/**
 * Created by harjitsingh on 6/30/15.
 */
package com.iworks
class Utils {


    static def createQueryString(def parameter) {


        parameter.remove('action')
        parameter.remove('controller')
        parameter.remove('format')

        if (parameter?.search?.isEmpty()) {
            parameter.remove("search")
        }

        String searchString = parameter.collect { it ->
            it.key << ":" << it.value.toLowerCase()
        }.join('+AND+')

        searchString
    }
}
