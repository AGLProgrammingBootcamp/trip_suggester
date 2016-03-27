Suggestions = Struct.new(:hotel_name,:address, :pref, :hotel_sample_fare, :sta_arrival, :trans_fare, :pict_url, :detail_url)
class DirectionController < ApplicationController
require 'mechanize'

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

  def start
    @prog_0 = "hdn"
    @prog_1 = "hdn"
    @prog_2 = "hdn"
    
  end
  
  def hotels
    #初期設定
    @api_key="leo153b0553fb1"
    @bgt=params[:bgt].to_i
    @max_rate=(@bgt*0.6).ceil.to_s  #thus @bgt should be more than \10,000 
    @min_rate="6000"
  
    @suggestions = Array.new()
    @count_sggs = 0
    @rndg  = Random.new

    #行き先hash
    #key... "ac_X or st_X   area codeか駅名か
    #value... "011105"とか"登別"とか
    @destination = Hash.new()

    @destination.store("ac_1", "011105")
    @destination.store("st_1", "登別")
    @destination.store("ac_2", "141602")
    @destination.store("st_2", "箱根湯本")
    @destination.store("ac_3", "210202")
    @destination.store("st_3", "熱海")
    @destination.store("ac_4", "210502")
    @destination.store("st_4", "伊豆高原")
    @destination.store("ac_5", "440502")
    @destination.store("st_5", "別府")
    @destination.store("ac_6", "220502")
    @destination.store("st_6", "下呂")
    @destination.store("ac_7", "191402")
    @destination.store("st_7", "和倉温泉")
    @destination.store("ac_8", "090205")
    @destination.store("st_8", "草津温泉")
    @destination.store("ac_9", "281102")
    @destination.store("st_9", "城崎温泉")
    @destination.store("ac_10", "380205")
    @destination.store("st_10", "道後温泉")
    @destination.store("ac_11", "460505")
    @destination.store("st_11", "指宿")
    @destination.store("ac_12", "010302") #定山渓，札幌からバス1h,770円
    @destination.store("st_12", "札幌")
    @destination.store("ac_13", "020802") #十和田湖，十和田市駅から...???
    @destination.store("st_13", "十和田市")
    @destination.store("ac_14", "060505") 
    @destination.store("st_14", "赤倉温泉")
    @destination.store("ac_15", "050302") 
    @destination.store("st_15", "田沢湖")


    @areas = ["011105","141602","210202","210502","220502","440502"]
    # NG list: 最寄り駅が見つからない??? page2 = nilClassになる　十和田湖020802, 塩原071502, 奥日光080602, 伊香保080805, 
    # // http://www.jalan.net/jalan/doc/jws/data/area.html area-code

   #           *****hotel fetcher*****  
   #  (1)エリアコードをランダム選択し，宿を2つFetch
   #  (2)それぞれの宿に対し，経路価格を算定
   #  (3)配列suggestionsに構造体@hotel_name.zipをpush
   #  (4)loop (1)-(3) 4回
    until @count_sggs == 6
#      @s_area=@areas.sample
      #hashオブジェクト @destinationのkey_ac とkey_stをランダム数列で選択・生成
      @dest_selector = @rndg.rand(1..14) +1
      @key_ac = "ac_"+@dest_selector.to_s
      @key_st = "st_"+@dest_selector.to_s
puts "@key_ac is #{@key_ac}"
puts "@key_st is #{@key_st}"
      @s_area=@destination[@key_ac]
      @arr=@destination[@key_st]
puts "@arr is #{@arr}"

      @address_dep=params[:dept]
      
      @dep = params[:dept]
      @move_fares=Array.new()
      @arrive=Array.new()

      agent = Mechanize.new
      @url="http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key="+@api_key+"&s_area="+@s_area+"&max_rate="+@max_rate+"&min_rate="+@min_rate+"&count=2&xml_ptn=1"
      page = agent.get(@url)
      @elements = page
  
      @hotel_name = page.search('HotelName')
      @hotel_prefecture = page.search('Prefecture')
      @hotel_address = page.search('HotelAddress')
      @hotel_detail = page.search('HotelDetailURL')
      @hotel_pictureurl = page.search('PictureURL')
      @hotel_sampleratefrom = page.search('SampleRateFrom')
  
      @hotel_name.zip(@hotel_address,@hotel_sampleratefrom).each do|name,address,sampleratefrom|
        #地名から緯度・経度を検索
       # agent1 = Mechanize.new
      #  page1 = agent1.get("http://www.geocoding.jp/api/?v=1.1&q="+@address_dep)
      #  @elements1=page1
      #  @lat1=page1.search('lat').inner_text
      #  @lng1=page1.search('lng').inner_text
  
        # agent2 = Mechanize.new
        # @address_app=address.inner_text
        # page2 = agent2.get("http://www.geocoding.jp/api/?v=1.1&q="+@address_app)
        # if page2.search('error').inner_text!="003"
        #   @lat2=page2.search('lat').inner_text
        #   @lng2=page2.search('lng').inner_text
         #緯度経度から最寄り駅を検索
      #     agent1 = Mechanize.new
      #    page1 = agent1.get("http://map.simpleapi.net/stationapi?x="+@lng1+"&y="+@lat1)
      #     @dep = page1.at('station name').inner_text
        #   agent4 = Mechanize.new
        #   page2 = agent4.get("http://map.simpleapi.net/stationapi?x="+@lng2+"&y="+@lat2)
        #   @arr = page2.at('station name').inner_text
          @arrive << @arr
          #最寄り駅から費用を計算
          agent = Mechanize.new
          page = agent.get("http://transit.yahoo.co.jp/search/result?flatlon=&from="+@dep+"&tlatlon=&to="+@arr+"&via=&via=&via=&y=2016&m=03&d=25&hh=16&m2=4&m1=3&type=1&ticket=ic&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&s=0&expkind=1&ws=2")
puts "search for trains done from #{@dep} to #{@arr}."
          @elements = page.search('ul li li.fare')
puts "Result price was #{@elements[0].inner_text}."
          @fare = @elements[0].inner_text.delete("円").delete(",")
          @fare = @fare.to_i
          @fare_return = @fare *2
          @move_fares << @fare_return
        # else
        #   @arrive << "unknown"
        #   @move_fares << "unknown"
        # end
        
      end
      
      @hotel_name.zip(@hotel_address,@hotel_detail,@hotel_prefecture,@hotel_pictureurl,@hotel_sampleratefrom,@arrive,@move_fares).each do|name,address,detail,prefecture,pictureurl,sampleratefrom,arr,fare|
          @suggestions.push(hotel_name:name.inner_text,address:address.inner_text, pref:prefecture.inner_text, hotel_sample_fare:sampleratefrom.inner_text, sta_arrival:arr, trans_fare:fare, pict_url:pictureurl.inner_text, detail_url:detail.inner_text)
      puts "@suggestions was created. fare was #{@move_fares}"
      end
      
      @count_sggs += 2
     puts "search in progress ....count #{@count_sggs}"
    end
    
  end

end