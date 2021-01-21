<template>
        <div class ="container my-5">
        	<div class="row justify-content-center">
        		<div class="col-8">
        			<router-link 
        			:to="{ name: 'transaction.index'}"
        			 class="btn btn-primary btn-sm rounded shadow mb-3">
        			Back</router-link>

        			<div class="card rounded shadow">
        				<div class="card-header">
        					Create Transaction
        				</div>
        			</div>

        			<div class="card-body rounded shadow">
        				<form @submit.prevent="store()">
                        <div class="mb-3">
                            <label class="form-label">Title</label>   
                            <input type="text" class="form-control" v-model='transaction.title'>  
                            <div v-if="validation.title" class="text-danger">
                                {{ validation.title[0] }}
                            </div>       
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Amount</label>   
                            <input type="text" class="form-control" v-model='transaction.amount'>  
                            <div v-if="validation.amount" class="text-danger">
                                {{ validation.amount[0] }}
                            </div>       
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Time</label>   
                            <input type="text" class="form-control" placeholder="yyyy-mm-dd hh:mm:ss" v-model='transaction.time'>  
                             <div v-if="validation.time" class="text-danger">
                                {{ validation.time[0] }}
                            </div>         
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Type</label>   
                            <select class="form-select" v-model='transaction.type'>
                                <option value="">Pilih Tipe</option>
                                <option value="expense">Expense</option>
                                <option value="revenue">Revenue</option>
                            </select> 
                            <div v-if="validation.type" class="text-danger">
                                {{ validation.type[0] }}
                            </div>       
                        </div>
                        <button class="btn btn-outline-primary">Submit</button>
                        </form>
        			</div>


        		</div>
        	</div>
       </div>

</template>

<script>

    //import data binding reactive
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default{
        //menggunakan vue3 api composition diawali dengan setup
        setup(){
            //data binding
            const transaction = reactive({
                title : '',
                amount : '',
                time : '',
                type : '',
            });

            //menampung data
            const validation = ref([]);

            //untuk berpindah halaman
            const router = useRouter();

            //fungsi untuk merequest ke dalam api endpoint
            function store(){
                axios.post(
                        'http://localhost:8000/api/transaction',
                        transaction
                    )

                //memberi event jika berhasil di akses
                .then((result) => {
                   router.push({
                        name : 'transaction.index'
                   });
                }).catch((err) => {
                    validation.value = err.response.data        //mengambil message error dari data api
                });
            }

            return {
                transaction,
                validation,
                router,
                store
            }

        }
        

    }
</script>