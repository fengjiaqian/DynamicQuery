function initCitySelector(id, url, timeout) {
    var DEFAULTS = {
    		id:"city-select-eidt",
    		timeout:200
    };
    var flag = true;  //flag为true：省市区，false：省市

    if(id){
        DEFAULTS.id = id;
    }
    if(timeout){
    	DEFAULTS.timeout = timeout;
    }
    

    setTimeout(function() {
        var data = url;

        var prov = $('#'+DEFAULTS.id+' .prov').attr("data-value");
        var city = $('#'+DEFAULTS.id+' .city').attr("data-value");

        //判断是否存在区域选择
        if($('#'+DEFAULTS.id+' .dist')[0] == undefined){
            flag = false;
        }else{
            var dist = $('#'+DEFAULTS.id+' .dist').attr("data-value");
            if(dist == null){
                dist = '';
            }
        }

        if(flag){
            //省市县
            if(url){
                $('#'+DEFAULTS.id).citySelect({
                    url: data,
                    prov: prov,
                    city: city,
                    dist: dist,
                });
            }else{
               $('#'+DEFAULTS.id).citySelect({
                    prov: prov,
                    city: city,
                    dist: dist,
                });
            }
        }else{
            //省市
            if(url){
                $('#'+DEFAULTS.id).citySelect({
                    url: data,
                    prov: prov,
                    city: city
                });
            }else{
               $('#'+DEFAULTS.id).citySelect({
                    prov: prov,
                    city: city
                });
            }
        }
    }, DEFAULTS.timeout);  
}