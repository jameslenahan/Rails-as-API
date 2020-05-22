class PlayersController < ApplicationController
  def index
    players = Player.all
    render json: PlayerSerializer.new(players).to_serialized_json
  end
end