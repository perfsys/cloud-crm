import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import contacts from '@/components/contacts'
import contacts_details from '@/components/contact-details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/contacts',
      component: contacts
    },
    {
      path: '/contacts/:group/:name',
      name: 'contact-datails',
      props: true,
      component: contacts_details

    }
  ]
})
