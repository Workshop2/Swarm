// an attempt to reduce redundant calls
function TargetGroupCache(targetCollection, systemParameters) {

    var groupCache = null,
        groupCacheCount = 0;

	var getGroup = function(bees) {

        if(groupCache == null || groupCacheCount > systemParameters.cacheLoops) {
            groupCache = targetCollection.groupBees(bees);
            groupCacheCount = 0;
        }
        else {
            groupCacheCount++;
        }

        return groupCache;
	};

	return {
		getGroup: getGroup
	};
}