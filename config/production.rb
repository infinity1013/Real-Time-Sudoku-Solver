#config/production.rb
start::app.configure do
     config.assets.compile = true
     config.cache_classes = true
     config.serve_static_assets = true
     config.assets.compile = true
     config.assets.digest = true
end
