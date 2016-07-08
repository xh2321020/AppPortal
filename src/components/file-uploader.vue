<template>
	<vue-file-upload url='upload.do'
		v-bind:files.sync="files"
		v-bind:filters="filters"
		v-bind:on-complete-upload="completeUpload">
		</vue-file-upload>
	<table>
		<thead>
			<tr>
				<th>name</th> 
				<th>size</th> 
				<th>progress</th> 
				<th>status</th> 
				<th>action</th> 
			</tr>				
		</thead>
			
		<tbody>
			<tr v-for="file in files"></tr>
				<td v-text="file.name"</td>
				<td v-text="file.size"</td>
				<td v-text="file.progress"</td>
				<td v-text="file.onStatus(file)"</td>
				<td>
					<button type='button',@onclick='uploadItem(file)'>上传</button>
				</td>
		</tbody>
			
	</table>
		
	<button type='button',@onclick='uploadAll'>上传所有文件</button>
</template>
<script>
import VueFileUpload from 'vue-file-upload';
export default{
  data(){
    return{
      files:[],
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ]
    }
  },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
        return "正在上传";
      }else{
        return "待上传";
      }
    },
    uploadItem(file){
      //单个文件上传
      file.upload();
    },
    uploadAll(){
      //上传所有文件
      this.$broadcast('DO_POST_FILE');
    },
    completeUpload(file,response,status,header){
      console.log("finish upload;")
    }
  },
  components:{
    VueFileUpload
  }
}
</script>