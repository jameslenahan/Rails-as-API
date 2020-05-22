class PlayerSerializer
  def initialize(player_object)
    @player = player_object
  end

  def to_serialized_json
    options = {
        include: {
            hands:{}
        },
        only: [:id, :name]
    }
    @player.to_json(options)
  end
end