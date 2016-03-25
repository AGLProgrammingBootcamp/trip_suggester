class DirectionController < ApplicationController

  def new
  end

  def show
    @dep=params[:dep]
    @arr=params[:arr]

    agent = Mechanize.new
    page = agent.get("http://roote.ekispert.net")
    @elements = page
  end

end
