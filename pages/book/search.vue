<template>
    <div>
      book/search
      <v-row>
      <v-col cols="6">
        <v-text-field
         v-model="keyword"
         label="本のタイトルを検索">
        </v-text-field>
      </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
           <v-btn
            color="primary"
            @click="search(keyword)"
            >検索する</v-btn>
        </v-col>
        <v-col cols="2">
           <v-btn
            color="warning"
            @click="clear"
            >クリアする</v-btn>
        </v-col>
        <!-- 画面遷移 -->
        <v-col cols="2">
            <v-btn
             color="secondary"
             to="/book">
             一覧に戻る
            </v-btn>
        </v-col>
      </v-row>
      <!-- styleはassetsの中に書く、nuxt.config.jsに追加するとグローバルにも使える -->
      <div 
        v-show="!isFound"
        class="mt-4">
         検索結果は０件でした。
      </div>
      <v-row class="mt-4">
        <v-col 
         v-for="(book,index) in searchResults" :key="index"
         cols="12"
         md="6">
        <v-card class="mx-auto mb-4">
          <v-row>
            <v-col cols="4">
              <a :href="book.link"> 
                <v-img :src="book.image"></v-img>
              </a>
            </v-col>
            <v-col cols="8">
                <v-card-title>{{ book.title }}</v-card-title>
                <v-card-text>{{ book.description }}</v-card-text>
                <v-card-text>出版日：{{ book.date }}</v-card-text>
                <v-spacer />
                <v-card-actions>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    color="indigo"
                    @click="addBookList(index)">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                  </v-btn>  
                </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    data(){
    return {
      keyword:'',
      searchResults:[],
      isFound: true
    }
  },
  methods:{
    addBookList(index){
      this.$emit('add-book-list', this.searchResults[index])
      // console.log(this.searchResults[index])
    },
    clear(){
      this.keyword=''
    },
    async search(keyword){
      this.searchResults = []
    // クエリーストリングを作成
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
      const params = {
        q: `intitle:${keyword}`,
        maxResults:40
      }
      const queryParams = new URLSearchParams(params)
    //   console.log(baseUrl + queryParams)

    // fetchでJSON取得
    const response = await fetch(baseUrl + queryParams)
    .then( response => response.json())
    // console.log(response.items)

    if(response.items === undefined){
      this.isFound = false
    } else {
      this.isFound = true
    // 必要な情報を配列にpush
    for(const book of response.items ){
      const title = book.volumeInfo.title
      const img = book.volumeInfo.imageLinks
      const description = book.volumeInfo.description
      const link =book.volumeInfo.infoLink
      const date =book.volumeInfo.publishedDate
      this.searchResults.push({
        title: title ? title : '', // eslint-disable-line
        image: img ? img.thumbnail : '',
        description: description ? description.slice(0, 40) : '',
        link: link ? link : '',// eslint-disable-line
        date: date ? date : '',// eslint-disable-line
      })
    }
  }
  }
  }
  }
  </script>
  
  <style>
  
  </style>