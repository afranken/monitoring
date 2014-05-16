import Types = require('../util/Types');
import Config = require('../jsonInterfaces/Config.d');
import Configuration = require('../configuration/Configuration');
import SectionModel = require('./SectionModel');
import MonitorModels = require('../model/MonitorModels');
import MonitorViewModel = require('../model/MonitorViewModel');
import SectionViewModel = require('./SectionViewModel');

/**
 * This class contains static methods that help with {@link SectionModel}s and {@link SectionViewModel}s.
 */
class SectionModels {

    public static createViewModels(sections:Array<Config.Section>, configuration:Configuration, hostname: string):Array<SectionViewModel> {
        var sectionViewModels:Array<SectionViewModel> = [];

        sections.forEach((section:Config.Section)=> {
            sectionViewModels.push(SectionModels.createViewModel(section, configuration, hostname));
        });

        return sectionViewModels;
    }

    /**
     * Create a {@link SectionViewModel} implementation with the given configuration.
     *
     * @param section
     * @param configuration
     * @param hostname
     * @returns SectionViewModel
     */
    public static createViewModel(section:Config.Section, configuration:Configuration, hostname: string):SectionViewModel {
        var sectionModel:SectionModel = SectionModels.createModel(section,hostname);
        var subSections:Array<SectionViewModel> = [];
        var monitorModels:Array<MonitorViewModel> = [];

        if(section.sections !== undefined) {
            section.sections.forEach(subSection => {
                    subSections.push(SectionModels.createViewModel(subSection, configuration, sectionModel.getHostname()));
                }
            );
        }

        if(section.monitors !== undefined) {
            section.monitors.forEach(monitor => {
                    monitorModels.push(MonitorModels.createViewModel(monitor, configuration, sectionModel.getHostname()));
                }
            );
        }

        return new SectionViewModel(subSections, monitorModels, sectionModel);
    }

    /**
     * Create a {@link SectionModel} implementation with the given configuration.
     *
     * @param section
     * @param hostname
     * @returns SectionViewModel
     */
    public static createModel(section:Config.Section, hostname: string):SectionModel {
        return new SectionModel(section, hostname);
    }

}

export = SectionModels;