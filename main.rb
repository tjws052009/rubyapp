require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require "sinatra/namespace"
require 'sinatra/reloader' 
require 'redis'

set :port, 8080
set :bind, '0.0.0.0'
set :public_folder, 'assets'

get '/' do
  erb :index
end

namespace '/api' do
  post '/set' do
    request_data = JSON.parse(request.body.read)
    key = request_data['key']
    value = request_data['value']

    result = redis.set(key, value)

    data = {
        "data": result
    }
    data.to_json
  end

  get '/get' do
    key = params['key']
    result = redis.get(key)
    data = {
        "data": result
    }

    data.to_json
  end

  get '/getall' do
    result = redis.keys('*')
    kv_result = result.map {|r| [r, redis.get(r)]}
    data = {
        "data": kv_result
    }

    data.to_json    
  end
end

def redis
  redis_host = ENV['REDIS_HOST'] || 'localhost'
  redis_port = ENV['REDIS_PORT'] || 6380
  redis_password = ENV['REDIS_PASSWORD'] || "password"

  Redis.new(host: redis_host, port: redis_port, password: redis_password, ssl: true)
end