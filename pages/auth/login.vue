<template>
    <v-card
      class="mx-auto"
      style="max-width: 500px;"
    >
        <v-card-title 
        class="text-h6 font-weight-regular justify-center">
         ログイン
        </v-card-title>
        <v-spacer></v-spacer>
      <v-form
        class="pa-4 pt-6"
      >
       <v-text-field
          v-model="email"
          :rules="[rules.email]"
          variant="filled"
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          variant="filled"
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn
          width="150"
          color="primary"
          @click="login"
        >
          ログイン
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          width="150"
          text
          to="./register">
           ユーザー登録
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>

    export default {
      data: () => ({
        email: '',
        password: '',
        rules: {
          email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
          length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
          password: v => !!(v || '').match(/^(?=.*[a-z]).+$/) ||
            'Password must contain an case letter, a numeric character',
          required: v => !!v || 'This field is required',
        },
      }),
      methods: {
            login(){
              this.$store.dispatch('auth/login',{
                email: this.email,
                password: this.password
              })
            }
        },
    }
  </script>

<style>

</style>