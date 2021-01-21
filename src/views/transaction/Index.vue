<template>
       <div class ="container my-5">
        	<div class="row justify-content-center">
        		<div class="col-8">
        			<router-link 
        			:to="{ name: 'transaction.create'}"
        			 class="btn btn-primary btn-sm rounded shadow mb-3">
        			Add</router-link>

        			<div class="card rounded shadow">
        				<div class="card-header">
        					Transaction List
        				</div>
        			</div>

        			<div class="card-body rounded shadow">
        				<table class="table">
        					<thead>
        						<tr>
        							<th>Title</th>
        							<th>Amount</th>
        							<th>Type</th>
        							<th>Action</th>
        						</tr>
							</thead>
							<tbody>
								<tr v-for = "(transaction, index) in transactions.data" :key="index">
									<td>{{ transaction.title }}</td>
									<td>{{ transaction.amount }}</td>
									<td>{{ transaction.type }}</td>
									<td>
										<div class="btn-group">
											<router-link 
											:to="{ name: 'transaction.edit', params:{id: transaction.id}}"
											class="btn btn-sm btn-outline-info">
											Edit</router-link>

											<button class="btn btn-sm btn-outline-danger" @click.prevent="destroy(transaction.id, index)">
												Delete
											</button>
										</div>
									</td>
								</tr>
							</tbody>
        				</table>
        			</div>


        		</div>
        	</div>
       </div>
</template>

<script>
	//memanggil axios dan onmount untuk mengambil data dari api
	import axios from 'axios'
	import {onMounted, ref} from 'vue'

    export default{
		//membuat variabel array untuk menampung data dari api
        setup() {
			let transactions = ref([]);

			onMounted(() => {
				// mengambil data dari api endpoint
				axios.get('http://localhost:8000/api/transaction')

				//memberi event jika berhasil di akses
				.then((result) => {
					transactions.value = result.data
				}).catch((err) => {
					console.log(err.response)
				});
			});

			//fungsi untuk merequest ke dalam api endpoint
            function destroy(id, index){
                axios.delete(
                       `http://localhost:8000/api/transaction/${id}`
                    )

                //memberi event jika berhasil di akses
                .then((result) => {
                  	//menghapus data dari tabel menggunakan index di vue js
                  	transactions.value.data.splice(index, 1)
                }).catch((err) => {
                    console.log(err.response.data);       //mengambil message error dari data api
                });
            }

			return {
				transactions,
				destroy
			}
		}

    }
</script>