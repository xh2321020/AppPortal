	var url = "http://192.168.253.1:8000/collspace/10002";

    url = "http://192.168.253.1:8000/api/V1.0/collspace/Coll/10002";
    //alert(url)
    $.ajax({
        type: "get",
	        dataType: "json",
	        url: url,
	        success: function success(data, state, jqxhr) {
	            var jsonArray = data;
	            var strHtml = "";
	            for (var i = 0; i < jsonArray.length; i++) {
	                strHtml = strHtml + "<tr style='bordered: 0; vertical-align: middle;'>" 
	                + "<td style='border: 0;'><img src='" + jsonArray[i].imgpath 
	                + "' style='min-width: 1.5rem; min-height: 1.5rem; width:90%;' /></td>" 
	                + "<td style='border: 0; vertical-align: middle;'><a href='jsonArray[i].collspaceid' target='_blank'>" 
	                + jsonArray[i].collspacename + "</a></td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                + jsonArray[i].member + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                + jsonArray[i].createusername + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                + jsonArray[i].createusername + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                + jsonArray[i].updatetime + "</td></tr>";
	            }
	            $("#tdbodys").html(strHtml);
	            $('#ownerTable').dataTable({
	                "oLanguage": {
	                    "sProcessing": "处理中...",
	                    "sLengthMenu": "_MENU_ 记录/页",
	                    "sZeroRecords": "没有匹配的记录",
	                    "sInfo": "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
	                    "sInfoEmpty": "显示第 0 至 0 项记录，共 0 项",
	                    "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
	                    "sInfoPostFix": "",
	                    "sSearch": "过滤:",
	                    "sUrl": "",
	                    "oPaginate": {
	                        "sFirst": "首页",
	                        "sPrevious": "上页",
	                        "sNext": "下页",
	                        "sLast": "末页"
	                    }
	                }
	            });
	        },
	        error: function error(err) {
	            console.log(err);
	        }
	    });
