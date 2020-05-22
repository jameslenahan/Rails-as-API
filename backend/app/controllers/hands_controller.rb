class HandsController < ApplicationController
  def create
    hand = Hand.new(

    )
  end
  def destroy
    hand = Hand.find_by(id: params[:id])
    render json: HandSerializer.new(hand.destroy).to_serialized_json
  end
end