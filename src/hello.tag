<hello>
  <h1>Hello {name}</h1>

  <script>
    this.name = opts.name || ''
    this.uppercase = function() {
          this.name = this.name.toUpperCase();
    }    
  </script>
</hello>
