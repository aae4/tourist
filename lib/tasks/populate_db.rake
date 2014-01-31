require "net/http"
require "uri"
require 'open-uri'
require "nokogiri"

namespace :db do
  desc "Fill database with sample equipment"
  task :populate => :environment do
		if ActiveRecord::Base.connection.table_exists? 'equipment'
			10.times do
				name = name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Страховочные системы (обвязки)").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
			10.times do
				name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Палатки").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
			10.times do
				name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Спальники").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
			10.times do
				name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Карабины").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
		end
  end

  desc "get prices from utkonos where price depends on weight"
  task :utkonos_addition => :environment do
  	#product ids with blank prices:
  	#[1169, 1170, 1171, 1172, 1173, 1174, 1414, 1415, 1416, 1417, 1418, 1419, 1676, 1677, 1678, 1679, 1680, 1681, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1806, 1807, 1808, 1809, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 1850, 1851, 1852, 1853, 1854, 1855, 1856, 2015, 2016, 2017, 2018, 2019, 2020, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2137, 2138, 2139, 2140, 2141, 2142, 2143, 2144, 2145, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2160, 2171, 2172, 2173, 2174, 2175, 2176, 2266, 2267, 2268, 2269, 2270, 2271, 2272, 2273, 2274, 2275, 2276, 2277, 2278, 2279, 2280, 2281, 2282, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2295, 2296, 2297, 2298, 2299, 2300, 2301, 2302, 2303, 2304, 2305, 2306, 2307, 2308, 2309, 2310, 2311, 2312, 2313, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2339, 2341, 2342, 2343, 2344, 2345, 2346, 2347, 2348, 2349, 2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, 2362, 2363, 2390, 2391, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2399, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2433, 2434, 2435, 2436, 2437, 2438, 2439, 2440, 2441, 2442, 2443, 2444, 2445, 2446, 2467, 2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2485, 2486, 2487, 2488, 2489, 2490, 2491, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2521, 2522, 2582, 2583, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2593, 2594, 2595, 2596, 2597, 2598, 2599, 2600, 2601, 2608, 2609, 7630, 7631, 7632, 7633, 7634, 7635, 7636, 7637, 7638, 7639, 7640, 7641, 7642, 7643, 7644, 7645, 7646, 7647, 7648, 7649, 7650, 7651, 7652, 7653, 7654, 7655, 7656, 7657, 7658, 7659, 7660, 7661, 7662, 7663, 7664, 7665, 7666, 7667, 7668, 7669, 7670, 7671, 7672, 7673, 7674, 7675, 7676, 7677, 7678, 7679, 7680, 7681, 7682, 7683, 7684, 7685, 7686, 7687, 7688, 7689, 7690, 7691, 7692, 7693, 7694, 7695, 7696, 7697, 7698, 7699, 7700, 7701, 7702, 7703, 7704, 7705, 7706, 7707, 7708, 7709, 7710, 7711, 7712, 7713, 7714, 7715, 7716, 7717, 7718, 7719, 7720, 7721, 7722, 7723, 7724, 7725, 7726, 7727, 7728, 7729, 7730, 7731, 7732, 7733, 7734, 7735, 7736, 7737, 7738, 7739, 7740, 7762, 7765, 7766, 7767, 7768, 7769, 7770, 7771, 7772, 7773, 7774, 7775, 7776, 7777, 7778, 7779, 7780, 7781, 7782, 7783, 7784, 7785, 7786, 7787, 7788, 7789, 7790, 7791, 7792, 7793, 7794, 7795, 7796, 7797, 7798, 7799, 7800, 7801, 7802, 7803, 7804, 7805, 7806, 7807, 7808, 7809, 7810, 7811, 7812, 7813, 7814, 7815, 7816, 7817, 7818, 7819, 7820, 7821, 7822, 7823, 7824, 7825, 7826, 7827, 7828, 7829, 7830, 7831, 7832, 7833, 7834, 7835, 7836, 7837, 7838, 7839, 7840, 7841, 7842, 7843, 7844, 7845, 7846, 7847, 7848, 7849, 7850, 7851, 7852, 7853, 7854, 7855, 7856, 7857, 7858, 7859, 7860, 7861, 7862, 7863, 7864, 7865, 7866, 7867, 7868, 7869, 7870, 7871, 7872, 7873, 7874, 7875, 7876, 8000, 8001, 8002, 8003, 8004, 8005, 8006, 8007, 8008, 8009, 8010, 8011, 8012, 8013, 8014, 8015, 8016, 8017, 8018, 8019, 8020, 8021, 8022, 8023, 8024, 8025, 8026, 8027, 8078, 8079, 8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 8088, 8089, 8090, 8091, 8092, 8093, 8094, 8095, 8096, 8097, 8098, 8099, 8100, 8101, 8102, 8103, 8104, 8105, 8148, 8149, 8150, 12028, 12029, 12030, 12031, 12032, 12033, 12034]
  	def update_price(product)
			page = Nokogiri::HTML(open(product.link))
			price = page.css(".goods_addblock-weight .color_black").text()
			price_weight = page.css(".page_items_control .price_weight").text()
			product.update_attributes(:price => "#{price} | #{price_weight}")
		end

		Product.where(:is_utkonos => 1, :price => "0.0").each{|p| update_price(p) }
  end

  desc "get utkonos products"
  task :utkonos => :environment do

		#page = Nokogiri::HTML(open("http://www.utkonos.ru/cat/1")) 
		#sublinks = page.css("a[class='align_center cat_preview']")
		#sublinks.each do |a|
		#	puts a["href"]
		#	puts a.text
		#end

		def get_info(url, spaces, product)
			page = Nokogiri::HTML(open(url))
			price = page.css(".page_items_control span").text().gsub(',','.').to_f.to_s
			description = page.css(".item_description").text()
			#puts spaces+"  --"+price + " == #{price.gsub(',','.').to_f}"
			#puts spaces+"  --"+description
			product.update_attributes(:description => description, :price => price)
			#puts "#{product.name} #{product.product_type_id} #{product.price}"
		end

		def get_goods(page, space, parent_id)
			next_page = page.css("a:contains('Вперед')")
			goods = page.css("a[class='goods_caption']")
			if goods.size == 0
				return
			else
				goods.each do |a|
					href = a["href"]
					title = a.text
					#puts space + title
					p=Product.create(:name => title, :link => "http://www.utkonos.ru#{href}", :is_utkonos => true, :product_type_id => parent_id)
					#puts "PRODUCT  " + p.name
					get_info("http://www.utkonos.ru#{href}", space, p)
				end
				if next_page.empty?()
					return
				else
					#puts "\n-------------\n|#{next_page.last['href']}| and #{next_page.empty?()}\n--------------------------\n"
					url = "http://www.utkonos.ru#{next_page.last['href']}"
					page = Nokogiri::HTML(open(url))
					get_goods(page, space, parent_id)
				end
			end
			
		end

		def get_childs(url, space, parent_id)
			page = Nokogiri::HTML(open(url))
			sublinks = page.css("a[class='align_center cat_preview']")
			if sublinks.size == 0
				get_goods(page, space+"  ", parent_id)
				return
			else
				space += "  "
				sublinks.each do |a|
					href = a["href"]
					title = a.text
					temp = ["Category", a.text]
					#puts href
					#puts space+title
					if parent_id == nil
						pt = ProductType.create(:name => title, :is_utkonos => true)
					else
						pt = ProductType.create(:name => title, :is_utkonos => true, :parent_id => parent_id)
					end
					#puts pt.name
					get_childs("http://www.utkonos.ru#{href}", space, pt.id)
				end
			end
		end

		get_childs("http://www.utkonos.ru/cat/1", "", nil)

  end
end