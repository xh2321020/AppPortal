eventApp.controller("LeaderCtrl", function($scope, $http, $timeout, EventService) {
      //var urlParams = {
      //      'userid': '10086',
      //      'companyid': '10',
      //      'collid': '',
      //      'type': '0',
      //      'startdate': "",
      //      'enddate': "",
      //};

      var urlParams = {
            'userid': '',
            'startdate': "",
            'enddate': "",
      };

      EventService.showLoading('数据请求中，请稍后... ...');
      $http.get( 'http://172.16.51.137:8010/api/contact/getOrglist?apikey=e71982d5401b488da4acef8827c41845', '')
      .success(function(response){
          $.unblockUI();
            if(true){
                  $scope.orgs = response;
                  $scope.orgClick2($scope.orgs[0]);
            }
      });

      var callback = function() {
            $('#calendar').fullCalendar({
                  header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'agendaWeek',
                  },
                  firstDay:1,
                  names: EventService.getNames(),
                  eventClick: function(calEvent, jsEvent, view) {
                        $scope.$apply(
                            function(){
                                  $scope.currentEvent = EventService.getEventDetail(calEvent.id);
                            }
                        );
                        $("#schedule").removeClass("active").removeClass("in");
                        $("#detail").addClass("active").addClass("in");
                  },
                  events: function(start, end, callback){
                        urlParams.startdate = start.format("yyyy-MM-dd");
                        urlParams.enddate = end.format("yyyy-MM-dd");
                        EventService.showLoading('数据获取中，请稍后... ...');
                        //EventService.getEvents(EventService.parseParam(urlParams), true, callback);
                        EventService.getEventsByPeople(urlParams, callback);

                        $timeout(
                            function() {
                                  document.getElementsByClassName('fc-button-agendaWeek')[0].click();
                            }, 1
                        );
                  },
            });
      };

      $scope.orgClick = function (org) {
            EventService.showLoading('数据请求中，请稍后... ...');
            for(var i = 0, j = $scope.orgs.length; i < j; i++){
                  if(org.id == $scope.orgs[i].id){
                        $scope.orgs[i].isSelected = true;
                  } else{
                        $scope.orgs[i].isSelected = false;
                  }
            }
            urlParams.companyid = org.id;
            $("#calendar").empty();
            EventService.getPeoples(EventService.parseParam(urlParams), callback);
      };

      $scope.orgClick2 = function (org) {
            for(var i = 0, j = $scope.orgs.length; i < j; i++){
                  if(org.id == $scope.orgs[i].id){
                        $scope.orgs[i].isSelected = true;
                  } else{
                        $scope.orgs[i].isSelected = false;
                  }
            }
            EventService.showLoading('数据获取中，请稍后... ...');
            //$http.get( 'http://172.16.51.137:8010/api/contact/getuserlist?apikey=e71982d5401b488da4acef8827c41845&ou=' + org.id, '')
            $http.get( 'http://172.16.51.137:8010/api/contact/getleader?apikey=e71982d5401b488da4acef8827c41845&ou=' + org.id, '')
                .success(function(response){
                      if(true){
                            var userIds = [];
                            var leaders = [];
                            console.log("response:" + response.length);
                            for(var i = 0, j = response.length; i < j; i++){
                                  var user =  response[i];
                                  user.id = user.uid;
                                  user.username = user.displayname;
                            //      //if(('isleader' in user) && user.isleader == '1' && user.orgtree.length == 2){
                            //      if(user.orgtree.length < 3){
                                        userIds.push({"userid": user.id});
                                        leaders.push(user);
                            //      }
                            }
                            //console.log("userIds:" + userIds.length);
                            $.unblockUI();
                            EventService.setPeoples(leaders);
                            $("#calendar").empty();
                            urlParams.userid = userIds;
                            callback();
                      }
                }
            );
      };

      $scope.scheduletype = [true, true, true, true, true];
      $scope.scheduleTypeClick = function(index){
            var scheduletypes = EventService.getScheduletypes();
            var typeId = scheduletypes[index].id;
            var disPlayEvents = EventService.getEventsByType(typeId, false);
            if($scope.scheduletype[index]){
                  for(var i = 0, j = disPlayEvents.length; i < j; i++){
                        $('#calendar').fullCalendar('removeEvents',  disPlayEvents[i].id);
                  }
            } else{
                  $('#calendar').fullCalendar('addEventSource',  disPlayEvents);
            }
            $scope.scheduletype[index] = !$scope.scheduletype[index];
      };

      $scope.addClick = function(){
            $scope.scheduletypes = EventService.getScheduletypes();
            $scope.scope = EventService.getScope();
            $scope.addParams = {
                  "id": "10086",
                  "title": "",
                  "scheduletype": "",
                  "userid": "10086",
                  "username": "",
                  "startdate": "2016-06-28",
                  "description": "",
                  "scope": "",
                  "enddate": "2016-06-28",
                  "starttime": "8:30",
                  "endtime": "18:30",
                  "address": "",
                  "content": "",
                  "responsible": "",
                  "responsibledepartment": "",
                  "sourcelink": "",
                  "createuserid": "10086",
                  "createusername": "sadfa",
                  "createtime": "2016-06-28",
                  "other": "",
                  "people": {
                        "id": '10086',
                        "companyid": "",
                        "scheduletype": "",
                        "scheduleId": "10086",
                        "userid": "",
                        "username": "",
                        "companyname": "",
                        "peopletype": "",
                        "updatetime": "",
                        "collsaceid": ""
                  }
            };
      };

      $scope.addEvent = function(){
            if(!$scope.addParams.userid || $scope.addParams.userid.length <= 0){
                  EventService.showAlert('请选择员工');
                  return;
            }
            if(!$scope.addParams.scheduletype || $scope.addParams.scheduletype.length <= 0){
                  EventService.showAlert('请选择日程类型');
                  return;
            }
            if(!$scope.addParams.scope || $scope.addParams.scope.id.length <= 0){
                  EventService.showAlert('请选择日程公开范围');
                  return;
            }
            $scope.addParams.scheduletype = $scope.addParams.scheduletype.id;
            $scope.addParams.scope = $scope.addParams.scope.id;
            EventService.showLoading('数据提交中，请稍后... ...');
            EventService.addEvent($scope.addParams, false);
      };

      $scope.addPeopleClick = function(){
            $scope.searchParams = {
                  "content": '',
                  "result": '',
            }
            $('#peopleSelectModal').modal('show');
      };

      $scope.searchPeople = function(){
            $http.get( 'http://172.16.51.137:8010/api/contact/searchuser?apikey=e71982d5401b488da4acef8827c41845&id=&q=' + $scope.searchParams.content, '')
                .success(function(response){
                      $scope.searchParams.result = response;
                      for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                            var people = $scope.searchParams.result[i];
                            var orgtree = people.orgtree;
                            var title = '';
                            if (orgtree) {
                                  for (var orgi in orgtree) {
                                        for (var key in orgtree[orgi]){
                                              title += orgtree[orgi][key];
                                        }
                                  }
                            }
                            people.orgtree = title;
                            people.isChecked = false;
                      }
                });
      };

      $scope.userClick = function(user){
            for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                  $scope.searchParams.result[i].isChecked = false;
            }
            user.isChecked = true;
            $scope.addParams.username = user.displayname;
            $scope.addParams.people.userid = user.uid;
            $scope.addParams.people.peopletype = user.isleade;
            $scope.addParams.people.companyname = user.orgtree;
            $scope.addParams.people.username = user.displayname;
      };

      $scope.peopleConfig = function(){
            $('#peopleSelectModal').modal('hide');
      };

      $scope.editClick = function(){
            $scope.editParams = $scope.currentEvent;
            $("#detail").removeClass("active").removeClass("in");
            $("#edit").addClass("active").addClass("in");
      };

      $scope.editSubmit = function(){
            EventService.editEvent($scope.editParams, true);
      };

      $scope.delete = function(id){
            EventService.deleteEventById($scope.currentEvent.id);
      };
});
