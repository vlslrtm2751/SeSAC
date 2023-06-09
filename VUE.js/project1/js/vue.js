const app = new Vue({
    el:'#app',
    data:{
        mode:'list',
        memo:{
            id:null,
            content:null,
            regDate:null
        },
        memos:[]
    },
    methods:{
        write:function(){
            this.mode='write';
            this.memo={
                id:null,
                content:null,
                regDate:null
            }
        },

        cancel:function(){
            this.mode='list';
        },

        save:function(){
            var id=this.memos.length+1;
            if(this.mode === 'write'){
                this.memos.push({
                    id:id,
                    content:this.memo.content,
                    regDate:new Date()
                })
            }else if(this.mode === 'edit'){
                for(var i in this.memos){
                    if(this.memos[i].id === this.memo.id){
                        this.memos[i] = this.renew(this.memo);
                        break;
                    }
                }
            }
            // this.memos.push({
            //     id:id,
            //     content:this.memo.content,
            //     regDate:new Date()
            // })
            //this.memo.content=null;
            this.mode='list';
            localStorage.setItem('memos',JSON.stringify(this.memos));
        },

        remove:function(){
            if(confirm('삭제하시겠습니까?'))
            for(var i in this.memos){
                if(this.memos[i].id === this.memo.id){
                    this.memos.splice(i,1);
                    break;
                }
            }
            this.mode="list";
            localStorage.setItem('memos',JSON.stringify(this.memos));
        },

        //참조값이 들어가지 않고 값으로 처리
        renew:function(val){
            return JSON.parse(JSON.stringify(val));
        },
        open:function(id){
            //console.log(id)
            for(var i in this.memos){//아이디를 가진 memo 찾기 위해 for
                if(this.memos[i].id===id){
                    this.memo = this.renew(this.memos[i]);//객체는 참조값으로만 들어가므로 renew 함수로 처리하여 값을 던짐
                    break;
                }
            }
            this.mode="edit"
        }
    },
    created:function(){
        var memos=localStorage.getItem('memos')
        if(memos){
            this.memos=JSON.parse(memos)
        }
    }
})