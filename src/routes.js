import index from '@/components/index'
import Starships from '@/components/Starships'
import Planets from '@/components/Planets'
import Characters from '@/components/Characters'

const routes = [
    { 
      path: '/', 
      component: index 
    },
    { 
      path: '/starships', 
      component: Starships, 
      props: {'loadMoreContent': true} 
    },
    { 
      path: '/planets', 
      component: Planets,
      props: {'loadMoreContent': true} 
    },
    { 
      path: '/characters', 
      component: Characters,
      props: {'loadMoreContent': true} 
    },
]
  
export default routes