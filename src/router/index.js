import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventDoctorView from '@/views/event/EventDoctorView.vue'
import EventVaccineView from '@/views/event/EventVaccineView.vue'
import AboutView from '../views/AboutView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import AddEvent from '@/views/EventForm.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import PeopleService from '@/services/PeopleService'
import DoctorService from '@/services/DoctorService.js'
import UserService from '@/services/UserService'
import Login from '@/views/LoginFormView.vue'
import Register from '@/views/RegisterFormView.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import EventUserView from '@/views/EventUserView.vue'
import DoctorListView from '@/views/DoctorListView.vue'
import AddComVac from '@/views/doctor/AddComVac.vue'
import CommentList from '@/components/CommentList.vue'
import ChangeRoleToDoctor from '@/components/EventUser.vue'
import ChangeRoleToPeople from '@/components/EventUser.vue'
import UserLayout from '@/views/event/UserLayout.vue'
import DoctorLayout from '@/views/event/DoctorLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage,
    beforeEnter: () => {
      if(GStore.currentUser == null){
        return "/login";
      }
      if (GStore.currentUser.authorities == 'ROLE_USER') {
        return {
          name: 'EventDetails',
          params: { id: GStore.currentUser.id }
        }
      }
      return {
        name: 'EventList'
      }
    },
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/home',
    name: 'EventList',
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/userLayout',
    name: 'UserLayout',
    component: UserLayout,
    beforeEnter: (to) => {
      return UserService.getUser(to.params.id)
        .then((response) => {
          GStore.user = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource'
            }
          } else {
            return { name: 'NetWorkError' }
          }
        })
      },
    children: [
      {
        path: 'changeRoleToPeople/:id',
        name: 'ChangeRoleToPeople',
        component: ChangeRoleToPeople,
        props: true,
        beforeEnter: () => {
          return DoctorService.getAllDoctor()
            .then((response) => {
              console.log(GStore.doctor)
              GStore.doctor = response.data
            })
            .catch(() => {
              GStore.doctor = null
              console.log('cannot load doctor')
            })
        }
      },
      {
        path: 'changeRoleToDoctor/:id',
        name: 'ChangeRoleToDoctor',
        component: ChangeRoleToDoctor,
        props: true
      }
    ]
  },
  {
    path: '/doctorLayout',
    name: 'DoctorLayout',
    component: DoctorLayout,
    beforeEnter: (to) => {
      return DoctorService.getDoctor(to.params.id)
        .then((response) => {
          GStore.doctor = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource'
            }
          } else {
            return { name: 'NetWorkError' }
          }
        })
      },
    children: [
      {
        path: 'changeRoleToPeople/:id',
        name: 'ChangeRoleToPeople',
        component: ChangeRoleToPeople,
        props: true,
        beforeEnter: () => {
          return DoctorService.getAllDoctor()
            .then((response) => {
              GStore.doctor = response.data
            })
            .catch(() => {
              GStore.doctor = null
              console.log('cannot load doctor')
            })
        }
      },
    ]
  },
  {
    path: '/userList',
    name: 'EventUserList',
    component: EventUserView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/doctorList',
    name: 'DoctorListView',
    component: DoctorListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/addComVac',
    name: 'addCommentOrVaccine',
    component: AddComVac
  },
  {
    path: '/commentList',
    name: 'commentList',
    component: CommentList
  },
  {
    path: '/people/:id',
    name: 'EventLayoutView',
    component: EventLayoutView,
    beforeEnter: (to) => {
      console.log('people')
      return PeopleService.getPeople(to.params.id)
        .then((response) => {
          GStore.people = response.data
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              parames: { resource: 'people' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    props: true,
    children: [
      {
        path: 'details',
        name: 'EventDetails',
        component: EventDetailView,
        props: true
      },
      {
        path: 'vaccine',
        name: 'EventVaccine',
        props: true,
        component: EventVaccineView
      },
      {
        path: 'doctor',
        name: 'EventDoctor',
        props: true,
        component: EventDoctorView
      }
    ]
  },
  {
    path: '/add-event',
    name: 'AddEvent',
    component: AddEvent,
    beforeEnter: () => {
      return DoctorService.getDoctor()
        .then((response) => {
          GStore.doctor = response.data
        })
        .catch(() => {
          GStore.doctor = null
          console.log('cannot load doctor')
        })
    }
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    // beforeEnter: () => {
    //   if (GStore.currentUser.authorities == 'ROLE_ADMIN') {
    //     return {
    //       name: 'EventList'
    //     }
    //   }
    //   return {
    //     name: '/'
    //   }
    // }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
