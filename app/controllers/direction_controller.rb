class DirectionController < ApplicationController

  def search
    @address_dep=params[:adress_dep]
    agent1 = Mechanize.new
    page1 = agent1.get("http://www.geocoding.jp/api/?v=1.1&q="+@address_dep)
    @elements1=page1
    @lat1=page1.search('lat').inner_text
    @lng1=page1.search('lng').inner_text
    agent2 = Mechanize.new
    @address_app=params[:adress_app]
    page2 = agent2.get("http://www.geocoding.jp/api/?v=1.1&q="+@address_app)
    @lat2=page2.search('lat').inner_text
    @lng2=page2.search('lng').inner_text
  end

  def create
  end

  def new
    if params[:lat1]!=nil
      @lat1 = params[:lat1]
      @lng1 = params[:lng1]
      agent1 = Mechanize.new
      page1 = agent1.get("http://map.simpleapi.net/stationapi?x="+@lng1+"&y="+@lat1)
      @dep = page1.at('station name').inner_text
    end
    if params[:lat2]!=nil
      @lat2 = params[:lat2]
      @lng2 = params[:lng2]
      agent4 = Mechanize.new
      page2 = agent4.get("http://map.simpleapi.net/stationapi?x="+@lng2+"&y="+@lat2)
      @arr = page2.at('station name').inner_text
    end
  end

  def show
    @dep=params[:dep]
    @arr=params[:arr]

    agent = Mechanize.new
    page = agent.get("http://transit.yahoo.co.jp/search/result?flatlon=&from="+@dep+"&tlatlon=&to="+@arr+"&via=&via=&via=&y=2016&m=03&d=25&hh=16&m2=4&m1=3&type=1&ticket=ic&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&s=0&expkind=1&ws=2")
    @elements = page.search('ul li li.fare')
    @fare = @elements[0].inner_text
    @elements = page.search('dl dt a')
    # @transfers = @elements[1].inner_text
    # @elemtnt= @elemtnt.inner_text
    # @elements.each do |ele|
    #   @element=ele.inner_text
    # end
  end

  def hotels
    @api_key="leo153b0553fb1"
    @s_area="440502" #別府
    # // http://www.jalan.net/jalan/doc/jws/data/area.html area-code
    agent = Mechanize.new
    page = agent.get("http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key="+@api_key+"&s_area="+@s_area)
    @elements = page
    @hotel_name = page.search('HotelName').inner_text
    @hotel_addres = page.search('HotelID HotelAddress').inner_text
    @hotel_detail = page.search('HotelDetailURL').inner_text
    @hotel_pictureurl = page.search('PictureURL').inner_text
    # @fare = @elements[0].inner_text
    # @elements = page.search('dl dt a')
  end

end