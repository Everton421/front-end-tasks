  export type tasks =  
         {  
        description:string,
        id:string,
        priority: 'high'|'low'|'medium',
        status: 'pendente' | 'em-andamento'| 'concluido'| 'cancelado',
        title:string,
        updatedAt:  Date,
        userId: string,
        createdAt : Date
        }

        export type priority = 'high' | 'low' | 'medium'
        export type arrPriorityTask =  ['high','low','medium']