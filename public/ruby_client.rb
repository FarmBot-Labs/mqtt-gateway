require 'em/mqtt'

# Publish example
EventMachine.run do
  c = EventMachine::MQTT::ClientConnection.connect('localhost')
  c.subscribe('mqtt/demo')
  c.receive_callback do |message|
    p message
  end
  EventMachine::PeriodicTimer.new(4.0) do

    puts "-- Publishing time"
    c.publish('mqtt/demo', "The time is #{Time.now}")
  end
end
